import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useI18n } from "../../context/I18nContext";

function ThemeToggle({ compact = false }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div className={`theme-toggle-shell ${compact ? "compact" : ""}`}>
      <button
        type="button"
        className={`theme-toggle ${isDark ? "active-dark" : "active-light"} ${compact ? "compact" : ""}`}
        onClick={toggleTheme}
        aria-label={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
        title={isDark ? t("theme.switchToLight") : t("theme.switchToDark")}
      >
        <span className="theme-toggle-icon">
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
