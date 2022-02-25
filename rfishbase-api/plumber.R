#* @filter cors
cors <- function(res) {
    res$setHeader("Access-Control-Allow-Origin", "*")
    plumber::forward()
}

#* @get /r/scientific
get_scientific <- function(common) {
  print(common)
  rfishbase::common_to_sci(common)
}