# makefile to produce html documentation # Last modified by jlc on Apr 16, 2022

INDEX = UserManualIndex.md-in

DOCS  = GettingStarted.md \
	InstallIndex.md \
	INSTALL.md \
	INSTALL-Cygwin.md \
	INSTALL-DEB.md \
	INSTALL-Fedora.md \
	INSTALL-FreeBSD.md \
	INSTALL-Mac.md \
	INSTALL-Redhat.md \
	INSTALL-Win.md \
	Obtain.md \
	Devices.md \
	Modems.md \
	Gateways.md \
	Clients.md \
	Modules.md \
	Use.md \
	Message.md \
	Alias.md \
	Hangup.md \
	Extensions.md \
	Log.md \
	Tools.md \
	FCCData.md \
	FakeNum.md \
	FAQ.md \
	Verbose.md \
	CONTRIBUTORS.md \
	TODO.md \
	GPL.md

API    = NCID-API.md
MANUAL = NCID-UserManual.md

FILES  = Makefile $(DOCS) $(API)

prefix   = /usr
prefix2  =
prefix3  =

SHARE    = $(prefix)/share

UMINDEX  = $(INDEX:-in=)

%.md : %.md-in
	@bash mk-manual-date $(DOCS)

usage:
	@echo "create NCID-UserManual.md: make doc"
	@echo "make html: create NCID-UserManual.html & NCID-API.html"
	@echo "make epub: create NCID-UserManual.epub and NCID-API.epub"
	@echo "make pdf:  create NCID-UserManual.pdf and NCID-API.pdf"
	@echo "update client screenshot:  make update"
	@echo "make install:             does nothing"
	@echo "clean directory:          make clean"
	@echo "remove built files:       make clobber"

doc: $(MANUAL)

update:
	convert -resize x185 ../screenshots/ncid-default-columns-day.png \
                         images/ncid-default-columns-day.png

sdk: $(MANUAL) $(API) test
	tar -czf NCID-SDK.tar.gz $(MANUAL) $(API) test
	touch sdk

$(MANUAL): $(UMINDEX) $(DOCS)
	cp $(UMINDEX) $(MANUAL)
	# Removed the Last edited Date from the top of the individual files
	sed '/HEADER Start/,/HEADER End/d;s/## <a name="gpl">/# <a name="gpl">/' \
        $(DOCS) >> $@

html: $(MANUAL) $(API)
	@if type pandoc; then \
	pandoc -M title="NCID User Manual" -s $(MANUAL) > NCID-UserManual.html; \
	pandoc -M title="NCID API" -s $(API) > NCID-API.html; else \
	echo pandoc is required to convert .md files into .html files; \
	echo see README-docdir for more information; fi
	touch html

epub: $(MANUAL) $(API)
	bash mk-epub
	touch epub

pdf-pandoc: html
	wkhtmltopdf NCID-UserManual.html NCID-UserManual.pdf
	wkhtmltopdf NCID-API.html NCID-API.pdf

pdf: $(API) $(MANUAL)
	bash mk-pdf
	touch pdf

# not needed
pdf-md: $(API) $(MANUAL)
	# NCID-API-pdf.md is NCID-API.md modified for better pdf pages
	# NCID-UserManual.md is NCID-UserManual-pdf.md modified for better pdf pages
	# patch files created after file.pdf.md created and updated by diff -u
	# diff -u file.md file.pdf.md > patch_file
	# diff -u NCID-UserManual.md NCID-UserManual-pdf.md > NCID-UserManual-pdf.md.patch
	cp $(API) NCID-API-pdf.md
	patch NCID-API-pdf.md < NCID-API-pdf.md.patch
	cp $(MANUAL) NCID-UserManual-pdf.md
	patch NCID-UserManual-pdf.md < NCID-UserManual-pdf.md.patch
	#rsvg-convert images/ncid-sms-relay.svg -h 825 \
    #             -o images/ncid-sms-relay-pdf.png
	touch pdf-md

libreoffice-pdf: html
	soffice --headless --convert-to pdf *.html
	touch libreoffice-pdf

test:
	cp -Rp ../test .

clean:

clobber: clean
	rm -f $(UMINDEX) $(MANUAL) *.txt *.epub *.html *.bak *.pdf *.gz \
		  sdk epub pdf images/ncid-sms-relay-pdf.png
	rm -fr *.png *.jpg pdf-md NCID-API-pdf.md NCID-UserManual-pdf.md
	rm -fr NCID-UserManual-pdf.md.orig NCID-UserManual-pdf.rej
	rm -fr NCID-API-pdf.md.orig NCID-API-pdf.md.rej
	rm -fr test libreoffice-pdf html

distclean: clobber
