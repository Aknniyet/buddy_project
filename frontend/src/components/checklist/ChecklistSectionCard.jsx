import { Check, FileText } from "lucide-react";

function ChecklistSectionCard({ category, tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="checklist-section-card">
      <div className="checklist-section-header">
        <div className="section-title-wrap">
          <div className="section-main-icon">
            <FileText size={18} />
          </div>

          <div>
            <h3>{category.title}</h3>
            <p>
              {completedCount} of {tasks.length} tasks completed
            </p>
          </div>
        </div>

        <div className="section-count-badge">
          {completedCount}/{tasks.length}
        </div>
      </div>

      <div className="checklist-tasks">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={task.completed ? "checklist-task completed" : "checklist-task"}
          >
            <div className="task-check">
              {task.completed ? <Check size={14} /> : null}
            </div>

            <div className="task-content">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>

            {task.completed && (
              <div className="task-status-icon">
                <Check size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChecklistSectionCard;