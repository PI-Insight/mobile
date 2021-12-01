import React, { useCallback } from "react";

export default function usePagination(limit: number) {
  const [offset, setOffset] = React.useState<number>(0);
  const next = useCallback(() => setOffset((offset) => offset + limit), []);
  return { offset, limit, next };
}
