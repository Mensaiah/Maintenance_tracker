import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Request from "../requests/Request";
import { Navbar } from "../layouts/Navbar";
import Container from "../layouts/Container";
import { getRequests } from "../../actions/requests";
import { loadUser } from "../../actions/user";
const RequestPage = ({ match, history }) => {
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      loadUser(dispatch);
      getRequests(dispatch);
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, dispatch, getRequests, history]);
  console.log(match);
  const heading = match.params.main;
  console.log(heading);

  const requests = useSelector(state => state.requests);
  const mainRequests = requests[heading];
  console.log(mainRequests);

  return (
    <div>
      <Navbar />
      <Container
        content={
          <div className="container">
            <section className="bg-light main">
              <h1 className="heading-bg">{heading} Requests</h1>
              {mainRequests.map(request => (
                <Request request={request} key={request.req_uid} />
              ))}
            </section>
          </div>
        }
      />{" "}
    </div>
  );
};

export default RequestPage;
