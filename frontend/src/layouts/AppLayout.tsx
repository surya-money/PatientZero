import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/nav/AppSidebar';

export function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
