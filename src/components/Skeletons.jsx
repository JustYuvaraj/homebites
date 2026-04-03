/**
 * Skeleton loading components for premium loading states.
 * Uses CSS shimmer animation instead of spinners for a more polished UX.
 */

export const MenuCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="skeleton h-48 w-full" />
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="skeleton h-5 w-5 rounded" />
        <div className="skeleton h-5 w-32 rounded" />
      </div>
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
      <div className="flex items-center justify-between mt-4">
        <div className="skeleton h-6 w-16 rounded" />
        <div className="skeleton h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);

export const MenuGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <MenuCardSkeleton key={i} />
    ))}
  </div>
);

export const OrderCardSkeleton = () => (
  <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
    <div className="flex items-center justify-between">
      <div className="skeleton h-5 w-28 rounded" />
      <div className="skeleton h-6 w-20 rounded-full" />
    </div>
    <div className="flex gap-3">
      <div className="skeleton h-16 w-16 rounded-lg" />
      <div className="flex-grow space-y-2">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
    <div className="flex justify-between">
      <div className="skeleton h-5 w-16 rounded" />
      <div className="skeleton h-9 w-28 rounded-lg" />
    </div>
  </div>
);

export const CheckoutSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton h-12 rounded-lg" />
          <div className="skeleton h-12 rounded-lg" />
          <div className="skeleton h-24 rounded-lg col-span-2" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-16 rounded-lg" />
        <div className="skeleton h-16 rounded-lg" />
      </div>
    </div>
    <div className="bg-white rounded-xl p-6 space-y-4">
      <div className="skeleton h-6 w-32 rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="skeleton h-12 w-12 rounded-lg" />
            <div className="flex-grow space-y-2">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="skeleton h-12 w-full rounded-xl" />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="skeleton h-20 w-20 rounded-full" />
      <div className="space-y-2">
        <div className="skeleton h-6 w-40 rounded" />
        <div className="skeleton h-4 w-56 rounded" />
      </div>
    </div>
  </div>
);

export default {
  MenuCardSkeleton,
  MenuGridSkeleton,
  OrderCardSkeleton,
  CheckoutSkeleton,
  ProfileSkeleton,
};
