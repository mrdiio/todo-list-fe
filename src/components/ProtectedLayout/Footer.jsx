export default function Footer() {
  return (
    <div className="flex justify-end bg-muted/40 h-8 px-4 md:px-6">
      <span className="text-muted-foreground/60 text-sm">
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
    </div>
  )
}
