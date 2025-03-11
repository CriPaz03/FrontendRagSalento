"use client";


import React from "react";
import * as SubframeCore from "@subframe/core";
import { IconWithBackground } from "./IconWithBackground";
import { AiChatToolbar } from "./AiChatToolbar";

interface AiChatReceivedRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AiChatReceivedRoot = React.forwardRef<
  HTMLElement,
  AiChatReceivedRootProps
>(function AiChatReceivedRoot(
  { children, className, ...otherProps }: AiChatReceivedRootProps,
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
      <IconWithBackground size="medium" icon="FeatherSparkle" />
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
        {children ? (
          <div className="flex w-full flex-col items-start pt-1.5">
            {children}
          </div>
        ) : null}
        <AiChatToolbar />
      </div>
    </div>
  );
});

export const AiChatReceived = AiChatReceivedRoot;
