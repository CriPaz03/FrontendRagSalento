"use client";

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Tooltip } from "./Tooltip";

interface AiChatToolbarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AiChatToolbarRoot = React.forwardRef<HTMLElement, AiChatToolbarRootProps>(
  function AiChatToolbarRoot(
    { children, className, ...otherProps }: AiChatToolbarRootProps,
    ref
  ) {
    return children ? (
      <div
        className={SubframeCore.twClassNames(
          "flex items-start justify-center",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children}
      </div>
    ) : null;
  }
);

export const AiChatToolbar = AiChatToolbarRoot;
