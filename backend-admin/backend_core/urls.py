from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    # This creates the exact login route for React to hit:
    path('api/login/', obtain_auth_token, name='api_login'),
]