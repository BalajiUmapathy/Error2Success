'use client';

import { useEffect, useState } from 'react';
import styles from './viewEdit.module.css';
import { getResourceById, updateResource } from '@/store/resourceStore';

const projectOptions = [
"Public Works Department (PWD)",
"National Highways Authority of India (NHAI)",
"Central Public Works Department (CPWD)",
"Rural Development Department",
"Municipal Corporation / Urban Local Bodies (ULBs)",
"Ministry of Road Transport and Highways (MoRTH)",
"Smart City SPVs (Special Purpose Vehicles)"
];

const statusOptions = ["Approved", "Rejected", "Waiting"];

const ResourceDetailsPage = ({ params }: { params: { userId: string; resourceId: string } }) => {
const [resource, setResource] = useState<null | {
id: string;
name: string;
type: string;
status: string;
quantity: number;
project: string;
}>(null);

useEffect(() => {
const found = getResourceById(params.resourceId);
if (found) {
setResource({
id: found.id,
name: found.name || '',
type: found.type || '',
status: found.status || '',
quantity: found.quantity || 0,
project: found.project || ''
});
}
}, [params.resourceId]);

const handleChange = (field: string, value: string | number) => {
if (!resource) return;
setResource(prev => ({
...prev!,
[field]: field === 'quantity' ? Number(value) : value
}));
};

const handleSubmit = () => {
if (!resource) return;
updateResource(resource.id, resource);
alert('Resource updated successfully!');
};

if (!resource) {
return <div className={styles.container}>Resource not found or failed to load.</div>;
}

return (
<div className={styles.container}>
<div className={styles.header}>View/Edit Resource</div>
<form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
<div className={styles.formRow}>
<label className={styles.label}>Resource Name</label>
<input className={styles.input} value={resource.name} disabled />
</div>
<div className={styles.formRow}>
<label className={styles.label}>Resource Type</label>
<input className={styles.input} value={resource.type} disabled />
</div>
<div className={styles.formRow}>
<label className={styles.label}>Status</label>
<select
className={styles.select}
value={resource.status}
onChange={(e) => handleChange('status', e.target.value)}
>
<option value="">Select Status</option>
{statusOptions.map(status => (
<option key={status} value={status}>{status}</option>
))}
</select>
</div>
<div className={styles.formRow}>
<label className={styles.label}>Quantity</label>
<input
className={styles.input}
type="number"
value={resource.quantity}
onChange={(e) => handleChange('quantity', e.target.value)}
/>
</div>
<div className={styles.formRow}>
<label className={styles.label}>Assigned Project</label>
<select
className={styles.select}
value={resource.project}
onChange={(e) => handleChange('project', e.target.value)}
>
<option value="">Select Project</option>
{projectOptions.map(project => (
<option key={project} value={project}>{project}</option>
))}
</select>
</div>
<button type="submit" className={styles.button}>Update Resource</button>
</form>
</div>
);
};

export default ResourceDetailsPage;