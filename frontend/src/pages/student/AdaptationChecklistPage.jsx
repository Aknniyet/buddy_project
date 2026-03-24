import { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProgressOverviewCard from "../../components/checklist/ProgressOverviewCard";
import CategoryTabs from "../../components/checklist/CategoryTabs";
import ChecklistSectionCard from "../../components/checklist/ChecklistSectionCard";
import { checklistCategories, checklistTasks, } from "../../constants/checklistData";
import "../../styles/checklist.css";

function AdaptationChecklistPage() {
  const [selectedCategory, setSelectedCategory] = useState("documents");

  const totalProgress = useMemo(() => {
    const allTasks = Object.values(checklistTasks).flat();
    const completedTasks = allTasks.filter((task) => task.completed).length;

    return Math.round((completedTasks / allTasks.length) * 100);
  }, []);

  const selectedCategoryData = checklistCategories.find(
    (item) => item.id === selectedCategory
  );

  return (
    <DashboardLayout title="Checklist">
      <section className="adaptation-checklist-page">
        <div className="adaptation-checklist-header">
          <h1>Adaptation Checklist</h1>
          <p>Track your progress settling into your new home</p>
        </div>

        <div className="checklist-main-card">
          <ProgressOverviewCard totalProgress={totalProgress} />

          <CategoryTabs
            categories={checklistCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <ChecklistSectionCard
          category={selectedCategoryData}
          tasks={checklistTasks[selectedCategory]}
        />
      </section>
    </DashboardLayout>
  );
}

export default AdaptationChecklistPage;