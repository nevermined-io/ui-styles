/// <reference types="vite-plugin-svgr/client" />
// This file exists because imports with ?url resource query wouldn't work when defined inside the global typing file
declare module '*.svg' {
  import type { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.svg?url' {
  const value: string;
  export default value;
}

// For PNG files
declare module '*.png' {
  import type { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.png?url' {
  const value: string;
  export default value;
}
