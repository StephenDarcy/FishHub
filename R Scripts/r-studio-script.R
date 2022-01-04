fishNamesTable <- rfishbase::common_to_sci("neon tetra")

fishName <- toString(fishNamesTable[1, 1])

species <- rfishbase::species(fishName)

print(typeof(species))
View(species)

