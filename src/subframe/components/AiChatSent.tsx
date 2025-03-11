"use client";

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "./Avatar";

interface AiChatSentRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  avatar?: string;
  className?: string;
}

const AiChatSentRoot = React.forwardRef<HTMLElement, AiChatSentRootProps>(
  function AiChatSentRoot(
    { children, avatar, className, ...otherProps }: AiChatSentRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex w-full items-start gap-4 pt-2 pb-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <Avatar image={avatar}>AB</Avatar>
        {children ? (
          <div className="flex grow shrink-0 basis-0 items-center gap-4 pt-1.5">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const AiChatSent = AiChatSentRoot;
