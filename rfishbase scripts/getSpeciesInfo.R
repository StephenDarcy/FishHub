install.packages("data.table")   
library("data.table")                   # Load data.table package
species <- rfishbase::species_names("11185")
speciesdf <- as.data.frame(species)
scientific_name <- speciesdf[["Species"]]
country <- rfishbase::country(scientific_name)
foodchain <- rfishbase::ecology(scientific_name)
ecosystem <- rfishbase::ecosystem(scientific_name)
fisheries <- rfishbase::faoareas(scientific_name)
food <- rfishbase::fooditems(scientific_name)
aquarium_trade <- rfishbase::introductions(scientific_name)
paramaters <- rfishbase::stocks(scientific_name)
swim <- rfishbase::swimming(scientific_name)

data_all <- merge.data.table(speciesdf, country, foodchain, ecosystem, fisheries, food, aquarium_trade, paramaters, swim)