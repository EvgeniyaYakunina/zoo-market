import * as React from 'react'

// Explicitly type props as React.SVGProps<SVGSVGElement>
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={`fill-current ${props.className}`}
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.692 5.694c.368-.205.365-.469-.009-.664C13.367 4.343 12.708 4 12 4s-1.367.343-2.683 1.03l-2 1.044c-1.614.842-2.42 1.263-2.869 2.02C4 8.85 4 9.79 4 11.673v1.652c0 1.883 0 2.824.448 3.58s1.255 1.178 2.869 2.02l2 1.044C10.633 20.657 11.292 21 12 21s1.367-.343 2.683-1.03l2-1.044c1.614-.842 2.42-1.263 2.869-2.02.448-.756.448-1.697.448-3.58v-1.652c0-1.883 0-2.824-.448-3.58-.329-.556-.851-.93-1.744-1.423-.367-.203-.389-.204-.763.004L11 10c-.344.19-.739.394-.91.77-.09.197-.09.375-.09.73V14a1 1 0 0 1-2 0v-4a1 1 0 0 1 .514-.874z"
    />
  </svg>
)

export default SVGComponent
