# common-to-sci.R
# used to turn common fishname to scientific
needs(rfishbase)
attach(input[[1]])

rfishbase::common_to_sci(commonName)