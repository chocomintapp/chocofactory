import React from "react";
import { Link } from "react-router-dom";

import { analytics } from "../../modules/firebase";

import { Button } from "../atoms/Button";

export const Hero: React.FC = () => {
  const onClickMypage = () => {
    analytics.logEvent("click", {
      type: "button",
      name: "mypage",
    });
  };
  const onClickDocs = () => {
    analytics.logEvent("click", {
      type: "button",
      name: "docs",
    });
  };

  return (
    <section>
      <div className="w-full">
        <div className="flex flex-col items-center mx-auto bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 p-8">
          <img className="h-80" src="/img/hero.png" />
          <div className="mx-auto py-2">
            <div className="flex items-center justify-center space-x-4">
              <Link to="/mypage" onClick={onClickMypage}>
                <Button type="primary">
                  Mypage<span className="ml-2">👷</span>
                </Button>
              </Link>
              <a href="https://docs.chocomint.app" onClick={onClickDocs}>
                <Button type="tertiary">
                  Docs<span className="ml-2">📝</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
