// store/resourceStore.ts
export interface Resource {
id: string;
name: string;
type: string;
quantity: number;
status: string;
project: string;
department?: string;
}

const STORAGE_KEY = 'resources-data';

function loadFromStorage(): Resource[] {
if (typeof window === 'undefined') return [];
const stored = localStorage.getItem(STORAGE_KEY);
return stored ? JSON.parse(stored) : [];
}

function saveToStorage(data: Resource[]) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getResources(): Resource[] {
return loadFromStorage();
}

export function addResource(resource: Omit<Resource, 'id'>) {
const current = loadFromStorage();
const newResource: Resource = {
id: Date.now().toString(), // Simple unique ID
...resource,
};
const updated = [newResource, ...current];
saveToStorage(updated);
}

export function getResourceById(id: string): Resource | undefined {
const current = loadFromStorage();
return current.find((r) => r.id === id);
}

export function updateResource(id: string, updatedData: Partial<Resource>) {
const current = loadFromStorage();
const updated = current.map((r) => (r.id === id ? { ...r, ...updatedData } : r));
saveToStorage(updated);
}