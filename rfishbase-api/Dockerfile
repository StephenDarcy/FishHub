# start from the rocker/r-base
FROM rstudio/plumber

RUN R -e "install.packages('rfishbase')"

# copy everything from the current directory into the container
COPY / /

CMD ["plumber.R"]