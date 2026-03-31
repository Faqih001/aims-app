export const createCrudHandlers = <T extends any>(table: any) => {
  return {
    async getAll(db: any) {
      return await db.select().from(table);
    },
    async getById(db: any, id: string) {
      const results = await db.select().from(table).where(eq(table.id, id));
      return results[0] || null;
    },
    async create(db: any, data: any) {
      const results = await db.insert(table).values(data).returning();
      return results[0];
    },
    async update(db: any, id: string, data: any) {
      const results = await db.update(table).set(data).where(eq(table.id, id)).returning();
      return results[0];
    },
    async remove(db: any, id: string) {
      const results = await db.delete(table).where(eq(table.id, id)).returning();
      return results[0];
    }
  };
};