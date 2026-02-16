export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-justify">
      <p>
        Prello is a web application inspired by Trello&apos;s visual board experience, built with Next.js 16, React 19, and TypeScript as part of a personal learning project. The main goal is to explore and practice modern web development concepts such as server-side rendering, state management, hooks, component-based architecture, and API integration.
      </p>
      <p>
        The project uses a current stack that includes Next.js (App Router), React 19, TypeScript, Prisma as ORM with PostgreSQL, HeroUI for the UI, Tailwind CSS with Sass for styling, Framer Motion for animations, and @atlaskit/pragmatic-drag-and-drop for dragging tasks between columns.
      </p>
      <p>
        The idea behind Prello is to have a simple and flexible board where you can organize tasks, projects, or notes while experimenting with new technologies and design patterns, improving skills within the TypeScript ecosystem through real, functional, and user-centered experiences.
      </p>
    </div>
  )
}
