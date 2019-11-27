import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../layouts/Navbar";
import Container from "../layouts/Container";
import Request from "../requests/Request";
import { getRequests } from "../../actions/requests";
import { loadUser } from "../../actions/user";

const Dashboard = props => {
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  const { history } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      loadUser(dispatch);
      getRequests(dispatch);
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, dispatch, getRequests, props.history]);
  const { pending, approved, resolved } = useSelector(state => state.requests);

  return (
    <div>
      <Navbar />
      <Container
        content={
          <div className="container">
            <section className="main">
              {pending.length > 0 && (
                <div>
                  <h1 className="heading-md">Pending Request</h1>
                  {pending.map(request => {
                    return (
                      <Request
                        key={request.req_uid}
                        size="mid"
                        request={request}
                      />
                    );
                  })}
                </div>
              )}
              {resolved.length > 0 && (
                <div>
                  <h1 className="heading-md">Resolved Request</h1>
                  {resolved.map(request => {
                    return (
                      <Request
                        key={request.req_uid}
                        size="mid"
                        request={request}
                      />
                    );
                  })}
                </div>
              )}
            </section>
            <section className="bg-sidebar">
              {approved.length > 0 && (
                <div>
                  <h1 className="heading-sm">Approved Request</h1>
                  {approved.map(request => {
                    return (
                      <Request
                        key={request.req_uid}
                        size="mid"
                        request={request}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        }
      />
    </div>
  );
};

export default Dashboard;
