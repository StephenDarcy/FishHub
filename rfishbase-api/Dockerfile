# start from the rstudio/plumber
FROM rstudio/plumber

RUN R -e "install.packages('rfishbase')"

COPY / /

CMD ["plumber.R"]