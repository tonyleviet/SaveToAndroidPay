/*
Copyright 2013 Google Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

using System;
using System.IO;
using System.Collections.Generic;
using System.Net.Http;
using System.Web;
using System.Web.Configuration;
using System.Security.Cryptography.X509Certificates;

using Google.Apis.Json;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;

using Google.Apis.Walletobjects.v1;
using Google.Apis.Walletobjects.v1.Data;
using WalletObjectsSample.Utils;
using WalletObjectsSample.Verticals;
using WalletObjectsSample.Webservice;

namespace WalletObjectsSample.Handlers
{
    public class WobWebserviceHandler : System.Web.IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public virtual void ProcessRequest(HttpContext context)
        {
            try
            {
                HttpRequest request = context.Request;

                WobCredentials credentials = new WobCredentials(
                WebConfigurationManager.AppSettings["ServiceAccountId"],
                WebConfigurationManager.AppSettings["ServiceAccountPrivateKey"],
                WebConfigurationManager.AppSettings["ApplicationName"],
                WebConfigurationManager.AppSettings["IssuerId"]);

                // OAuth - setup certificate based on private key file
                X509Certificate2 certificate = new X509Certificate2(
                  AppDomain.CurrentDomain.BaseDirectory + credentials.serviceAccountPrivateKey,
                  "notasecret",
                  X509KeyStorageFlags.Exportable);

                WobUtils utils = null;
                WebserviceRequest webRequest = null;
                JsonWebToken.Payload.WebserviceResponse webResponse = null;
                string jwt = null;

                ReadEntityBodyMode read = request.ReadEntityBodyMode;
                Stream inputStream = null;

                if (read == ReadEntityBodyMode.None)
                    inputStream = request.GetBufferedInputStream();
                else
                    inputStream = request.InputStream;

               // webRequest = NewtonsoftJsonSerializer.Instance.Deserialize<WebserviceRequest>(inputStream);
                /*
                if (webRequest.Method.Equals("signup"))
                {
                    webResponse = new JsonWebToken.Payload.WebserviceResponse()
                    {
                        Message = "Welcome to baconrista",
                        Result = "approved"
                    };
                }
                else
                {
                    webResponse = new JsonWebToken.Payload.WebserviceResponse()
                    {
                        Message = "Thanks for linking to baconrista",
                        Result = "approved"
                    };
                }
                */
               //utils = new WobUtils(credentials.IssuerId, certificate);
                string loyaltyClassId = WebConfigurationManager.AppSettings["LoyaltyClassId"];
                string loyaltyObjectId = WebConfigurationManager.AppSettings["LoyaltyObjectId"];
                //string linkId = webRequest.Params.LinkingId;
                LoyaltyObject loyaltyObject = Loyalty.generateLoyaltyObject(credentials.IssuerId, loyaltyClassId, loyaltyObjectId);
               // utils.addObject(loyaltyObject);
                /*
                 * Using Rest API
                 */

                // create service account credential
                ServiceAccountCredential credential = new ServiceAccountCredential(
                new ServiceAccountCredential.Initializer(credentials.serviceAccountId)
                {
                    Scopes = new[] { "https://www.googleapis.com/auth/wallet_object.issuer" }
                }.FromCertificate(certificate));


                var woService = new WalletobjectsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Wallet Objects API Sample",
                    
                });
                var list = woService.Loyaltyobject.List(credentials.IssuerId + "." + loyaltyClassId).Execute();
                var execute = woService.Loyaltyobject.Insert(loyaltyObject).Execute();
                Console.WriteLine("Done");
                /*
                 * Using Web Render Button
                /*
                utils.addObject(loyaltyObject);

                jwt = utils.GenerateWsJwt(webResponse);

                HttpResponse response = context.Response;             
                response.Write(jwt);
                 * */
            }
            catch (Exception e)
            {
                Console.Write(e.StackTrace);
            }
        }
    }
}

