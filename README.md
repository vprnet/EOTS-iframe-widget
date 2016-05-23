#VPR Eye On The Sky iFrame Widget
The widget uses the SoundCloud API to provide a playlist of the most recent [Eye On The Sky](http://www.fairbanksmuseum.org/eye-on-the-sky) forecasts. This repository powers the widget seen on the EYE ON THE SKY tab on the VPR mobile apps. The widget running on VPR's desktop homepage uses the same code but lives [here](http://www.vpr.net/apps/eots-pym/).


## Technology
- [Flask](http://flask.pocoo.org/): Used for local development
- [Frozen-Flask](http://pythonhosted.org/Frozen-Flask/): Freezes Flask application into a series of static files
- [Jinja](http://jinja.pocoo.org/docs/): Python templating language


## Set Up

1. Install [virtualenv](https://pypi.python.org/pypi/virtualenv).
2. Clone the repository. `git clone git@github.com:vprnet/app-template.git`
3. Change into the directory. `cd app-template`
4. Create a virtual environment in project. `virtualenv venv`
5. Enter virtual environment. `source venv/bin/activate`
6. Install requirements. `pip install -r requirements.txt`
7. Copy the config template. `cp main/_config.py main/config.py`


##Develop

To run local server, get back to project root and run: `python runserver.py`. The project will be viewable at http://127.0.0.1:5000/.


## Deploy

1. Create an S3 bucket to serve content using [Amazon's documentation](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) for hosting a static website.
2. Configure AWS settings in `config.py`.
4. Freeze files and push to S3. `python runserver.py freeze`

## Author
[Matt Parrilla](http://twitter.com/mattparrilla)

##Copyright and License

Copyright 2013 Vermont Public Radio

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language
governing permissions under the License.
