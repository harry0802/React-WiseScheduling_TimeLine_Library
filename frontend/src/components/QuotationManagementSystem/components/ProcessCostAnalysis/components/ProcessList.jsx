import ProcessItem from "./ProcessItem";
function ProcessList({ processes, costResult, onUpdate, onDelete }) {
  return processes.map((process, index) => (
    <ProcessItem
      key={process.id}
      process={process}
      index={index}
      costDetail={costResult.costDetails.find(
        (detail) => detail.id === process.id
      )}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  ));
}

export default ProcessList;
