import re

from django.http import HttpResponse
from django.template import loader

from anna_client.client import Client


def index(request):
	template = loader.get_template('index.html')
	client = Client('http://falcon:5000')  # TODO: singleton
	client.authenticate(True)
	jobs = []
	for job in client.query():
		if all(attribute in job for attribute in ('tag', 'status', 'log', 'updated_at')):
			jobs.append({'tag': job['tag'], 'status': job['status'], 'log': job['log'][-int(job['log'].find(' ')):],
			             'updated_at': re.sub(r'.*, ', '', job['updated_at'].rstrip(' GMT'),)})
	return HttpResponse(template.render({'jobs': jobs}, request))


def done(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render({}, request))
