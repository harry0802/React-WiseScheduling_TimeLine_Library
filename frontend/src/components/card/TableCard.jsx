import { Icon } from "@iconify/react";

function TableCard({ title, onAddClick, children }) {
  return (
    <div className="table-card">
      <div className="table-card__header">
        <div className="header__title">
          <h3>{title}</h3>
        </div>

        <div className="header__button">
          <button onClick={onAddClick}>
            <Icon icon="gg:add" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default TableCard;
