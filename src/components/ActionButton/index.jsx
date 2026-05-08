// Така-собі шаблонна кнопка видалення
function ActionButton({ onClickAction, icon, className }) {
  return (
    <button onClick={onClickAction} className={className}>
      {icon}
    </button>
  );
}

export default ActionButton;
