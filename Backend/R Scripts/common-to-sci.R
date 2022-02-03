# common-to-sci.R
# used to turn common fishname to scientific
needs(rfishbase)
fishNamesTable <- rfishbase::common_to_sci(input)
fishName <- toString(fishNamesTable[1, 1])
