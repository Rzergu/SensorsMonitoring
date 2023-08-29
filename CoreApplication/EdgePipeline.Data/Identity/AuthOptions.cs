﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace IoTMonitoring.Data.Identity
{
	public class AuthOptions
	{
		public const string ISSUER = "MyAuthServer"; // издатель токена
		public const string AUDIENCE = "MyAuthClient"; // потребитель токена
		const string KEY = "mysupersecret_secretkey!123456789hhhhbbbbnnnnmmmm";   // ключ для шифрации
		public const int LIFETIME = 1; // время жизни токена - 1 минута
		public static SymmetricSecurityKey GetSymmetricSecurityKey()
		{
			return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
		}
	}
}
