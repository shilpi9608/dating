
  export function ProfileHeader({ title, subtitle }) {
    return (
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    )
  }
  
  