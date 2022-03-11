species <- rfishbase::species_names("11185")
speciesdf <- as.data.frame(species)
scientific_name <- speciesdf[["Species"]]
country <- rfishbase::country(scientific_name)
foodchain <- rfishbase::ecology(scientific_name)