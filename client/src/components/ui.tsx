import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item"

export function ItemWrapper({
  size = "md",
  title,
  description,
  className,
}: {
  size?: "xs" | "sm" | "md"
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Item size={size} className={className}>
      <ItemContent>
        {title && <ItemTitle>{title}</ItemTitle>}
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
    </Item>
  )
}
