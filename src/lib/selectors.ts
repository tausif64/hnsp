import type { RootState } from "@/store/store";

export const selectIsLoading = (state: RootState): boolean => {
  return Object.values(state).some((slice) => slice.isLoading === true);
};
