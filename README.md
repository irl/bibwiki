# bibwiki

*BibTeX Generator for Wikipedia*

This project uses Wikipedia's API to extract information about articles
using their URLs and then formats a citation for that article for use
with BibTeX.

## Things that happen when you click the button

1. The country code and article name are extracted from the URL.
2. All redirects are followed to get to the canonical name for the article.
3. The details for the article are retrieved.
4. The BibTeX and HTML representations for the citation are updated.

Steps 3 and 4 occur as asynchronous callbacks once the previous step is complete.

## Bundled dependencies

This project uses:

 * Twitter Bootstrap
 * jQuery
 * moment.js
 
## Disclaimer
 
Most educators and professionals do not consider it appropriate to use
tertiary sources such as encyclopedias as a sole source for any
information. Citing an encyclopedia as an important reference in footnotes
or bibliographies may result in censure or a failing grade. Wikipedia
articles should be used for background information, as a reference for
correct terminology and search terms, and as a starting point for
further research.
