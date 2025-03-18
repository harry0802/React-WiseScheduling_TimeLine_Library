import React from "react";
import useExampleQuery from "../../hooks/useExampleQuery";

function QueryExample() {
  const { data, error, isLoading, isError, refetch } = useExampleQuery();

  if (isLoading) {
    return <div>正在載入數據...</div>;
  }

  if (isError) {
    return <div>錯誤: {error.message}</div>;
  }

  return (
    <div>
      <h2>示例數據</h2>
      <button onClick={() => refetch()}>重新獲取</button>
      <ul>
        {data.data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QueryExample;
