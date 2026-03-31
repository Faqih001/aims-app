import fs from 'fs';
import path from 'path';

const statPath = path.resolve('dashboard/pages/applicant/status.vue');
let statContent = fs.readFileSync(statPath, 'utf-8');

const statReplace = `
const { data: myApps } = await useFetch('/api/applicant/applications', { default: () => [] })
const currentDbStatus = computed(() => myApps.value?.length ? myApps.value[0].status : 'PENDING')
`;

statContent = statContent.replace(/const currentDbStatus = ref\('[^']+'\)/, statReplace);
statContent = statContent.replace(/import { ref } from 'vue'/, "import { ref, computed } from 'vue'");
fs.writeFileSync(statPath, statContent, 'utf-8');
console.log('Fixed applicant status mock data');
