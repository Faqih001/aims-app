import fs from 'fs';
import path from 'path';

const assessorRolesFiles = [
  { p: 'dashboard/pages/assessor/assignments.vue', route: '/api/assessor/assignments' },
  { p: 'dashboard/pages/reviewer/assignments.vue', route: '/api/reviewer/assignments' }
];

assessorRolesFiles.forEach(fileData => {
  const filePath = path.resolve(fileData.p);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the kanban column setup to utilize the fetched API.
  // Instead of static kanban columns with cards hardcoded, we define the standard empty columns
  // Then we will watch or computed property the assignments.
  const apiCall = `
const { data: assignmentsList } = await useFetch('${fileData.route}', { default: () => [] })

const columns = computed(() => {
  const list = assignmentsList.value || []
  return [
    {
      status: 'TO_DO',
      title: 'To Do',
      cards: list.map(a => ({
        id: a.id,
        scope: \`Application \${a.applicationId}\`,
        date: new Date(a.createdAt).toLocaleDateString()
      }))
    },
    {
      status: 'IN_PROGRESS',
      title: 'In Progress',
      cards: [] // Additional logic based on assessment status can be added later
    },
    {
      status: 'DONE',
      title: 'Completed',
      cards: []
    }
  ]
})
`;

  // We are going to replace standard `const columns = ref([...])` with our script
  content = content.replace(/const columns = ref\(\[[\s\S]*?\]\)/, apiCall);
  content = content.replace(/import { ref } from 'vue'/, "import { ref, computed } from 'vue'");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Updated assignments kanban for', fileData.p);
});
