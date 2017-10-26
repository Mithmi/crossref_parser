import json
from django.views.generic import View, TemplateView, FormView
from django.http import JsonResponse,HttpResponse
from django.shortcuts import render


def index(request):
    template_name = 'base.html'
    return render(request, template_name)