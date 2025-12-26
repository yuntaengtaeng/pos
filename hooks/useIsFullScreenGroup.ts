import { useSegments } from "expo-router";

const useIsFullScreenGroup = () => {
  const segments = useSegments() as string[];
  return segments.some((segment) => segment === "(fullscreen)");
};

export default useIsFullScreenGroup;
