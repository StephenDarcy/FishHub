
#* @get /predict_petal_length
get_predict_length <- function(petal_width) {
 1 + 1
}

#* @get /common
get_sci <- function(common) {
  print(common)
  rfishbase::common_to_sci(common)
}