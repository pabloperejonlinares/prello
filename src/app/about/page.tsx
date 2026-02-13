'use client'
import { Card, CardBody } from '@heroui/react'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card shadow="md" radius="lg">
        <CardBody className="gap-4 text-default-700">
          <p>
            Prello is a web application inspired by Trello&apos;s visual board experience, built with React and Next.js as part of a personal learning journey. The main goal behind this project is to explore and practice modern web development concepts such as server-side rendering, state management, hooks, component-based architecture, and API integration.
          </p>
          <p>
            This project was created with the idea of building a simple and flexible board where tasks, projects, or notes can be organized while experimenting with new technologies and design patterns.
          </p>
          <p>
            Through this application, I aim to continue improving my skills within the TypeScript ecosystem by building real, functional, and user-centered experiences.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
