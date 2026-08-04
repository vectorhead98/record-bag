import db from "../sqlite"

const labelsToInsert = [
  {
    name: "Perlon",
    slug: "perlon",
    country: "DE",
    note: "Genre defining minimal label founded by Markus Nikolai, Thomas Franzmann & Chris Rehberger in Frankfurt 1997. Now based in Berlin.",
    cover_img: "https://assets.record-bag.org/labels/perlon.webp",
    parent_id: null,
  },
  {
    name: "Seekers",
    slug: "seekers",
    country: "DE",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/seekers.webp",
    parent_id: null,
  },
  {
    name: "Underground Quality",
    slug: "underground-quality",
    country: "US",
    note: "Run by DJ Jus-Ed.",
    cover_img: "https://assets.record-bag.org/labels/underground-quality.webp",
    parent_id: null,
  },
  {
    name: "Basic Channel",
    slug: "basic-channel",
    country: "DE",
    note: "Genre defining dub techno label founed by Moritz von Oswald & Mark Ernestus in Berlin 1993.",
    cover_img: "https://assets.record-bag.org/labels/basic-channel.webp",
    parent_id: null,
  },
  {
    name: "Metereze",
    slug: "metereze",
    country: "RO",
    note: "Run by Raresh.",
    cover_img: "https://assets.record-bag.org/labels/metereze.webp",
    parent_id: null,
  },
  {
    name: "Peacefrog Records",
    slug: "peacefrog-records",
    country: "UK",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/peacefrog-records.webp",
    parent_id: null,
  },
  {
    name: "Giegling",
    slug: "gielging",
    country: "DE",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/giegling.webp",
    parent_id: null,
  },
  {
    name: "[a:rpia:r]",
    slug: "arpiar",
    country: "RO",
    note: "Founded by Rhadoo, Petre Inspirescu & Raresh.",
    cover_img: "https://assets.record-bag.org/labels/arpiar.webp",
    parent_id: null,
  },
  {
    name: "B12",
    slug: "b12",
    country: "UK",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/b12.webp",
    parent_id: null,
  },
  {
    name: "Warp Records",
    slug: "warp-records",
    country: "UK",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/warp-records.webp",
    parent_id: null,
  },
  {
    name: "My King Is Light",
    slug: "my-king-is-light",
    country: "DE",
    note: "Run by Thomas Melchior.",
    cover_img: "https://assets.record-bag.org/labels/my-king-is-lights.webp",
    parent_id: null,
  },
  {
    name: "Scopex",
    slug: "scopex",
    country: "UK",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/scopex.webp",
    parent_id: null,
  },
  {
    name: "Likemind",
    slug: "likemind",
    country: "UK",
    note: null,
    cover_img: "https://assets.record-bag.org/labels/likemind.webp",
    parent_id: null,
  },
]

type LabelArray = (typeof labelsToInsert)[number]

const insertLabel = db.prepare(
  `
  INSERT OR IGNORE INTO labels (name, slug, country, note, cover_img, parent_id, created_by)
  VALUES ($name, $slug, $country, $note, $cover_img, $parent_id, '1')
  `
)

const insertManyLabels = db.transaction((labelArray: LabelArray[]) => {
  for (const label of labelArray) {
    insertLabel.run({
      $name: label.name,
      $slug: label.slug,
      $country: label.country,
      $note: label.note,
      $cover_img: label.cover_img,
      $parent_id: label.parent_id,
    })
  }
  return labelArray.length
})

const len = insertManyLabels(labelsToInsert)

console.log(len)
