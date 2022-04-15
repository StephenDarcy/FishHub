#* @filter cors
cors <- function(res) {
    res$setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res$setHeader("Access-Control-Allow-Credentials ", "true")
    plumber::forward()
}

#* @get /r/scientific
get_scientific <- function(common) {
  print(common)
  rfishbase::common_to_sci(common)
}

#* @get /r/common
get_common <- function(scientific) {
  print(scientific)
  rfishbase::common_names(scientific)
}

#* @get /r/country
get_country <- function(scientific) {
  print(scientific)
  rfishbase::country(scientific)
}

#* @get /r/foodchain
get_foodchain <- function(scientific) {
  print(scientific)
  rfishbase::ecology(scientific)
}

#* @get /r/ecosystem
get_ecosystem <- function(scientific) {
  print(scientific)
  rfishbase::ecosystem(scientific)
}

#* @get /r/fisheries
get_fisheries <- function(scientific) {
  print(scientific)
  rfishbase::faoareas(scientific)
}

#* @get /r/food
get_food <- function(scientific) {
  print(scientific)
  rfishbase::fooditems(scientific)
}

#* @get /r/aquarium
get_aquarium <- function(scientific) {
  print(scientific)
  rfishbase::introductions(scientific)
}

#* @get /r/parameters
get_parameters <- function(scientific) {
  print(scientific)
  rfishbase::stocks(scientific)
}
