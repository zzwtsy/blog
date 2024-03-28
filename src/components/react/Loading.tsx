import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

/**
 * Loading 组件用于显示一个加载中的状态。
 *
 * @param {Object} 配置对象，包含以下可选属性：
 *  - height: string | number，默认为 "100%"，设置加载动画的高度。
 *  - width: string | number，默认为 "100%"，设置加载动画的宽度。
 */
export function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader className="w-6 h-6 animate-spin" />
    </div>
  );
}
