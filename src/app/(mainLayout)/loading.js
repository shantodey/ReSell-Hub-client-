import { Spinner } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">ReSellHub</h1>
          <p className="text-xs tracking-widest uppercase text-default-400 font-medium"> Next-Gen Marketplace</p>
        </div>
        <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
      </div>
      </div>
    </div>
  );
}