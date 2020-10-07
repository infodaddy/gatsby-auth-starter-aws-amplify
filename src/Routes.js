import React from 'react'
import ResetPassword from "./containers/ResetPassword";
import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

<UnauthenticatedRoute exact path="/login/reset">
  <ResetPassword />
</UnauthenticatedRoute>