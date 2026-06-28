import UserTableClient from '@/app/Component/Dashboard/UserTableClient';
import { adminUserSearch } from '@/lib/api/admin/adminApi';



export default async function ManageUsersPage({ searchParams }) {
    const params = await searchParams; 
    const search = params?.search || '';
    const users = await adminUserSearch(search) ;
   
    return (
        <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Manage Users</h1>
                <p className="text-sm text-gray-500">Search, update status, block or delete accounts.</p>
            </header>
            <UserTableClient initialUsers={users} />
        </div>
    );
}