import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  userData: any;
  followed = false;
  followingLength: any = 0;
  followData: Array<any> = [];
  following: Array<any> = [];
  followData_sec: Array<any> = [];
  followers: Array<any> = [];
  followersLength: any = 0;
  followersNames: any = "";
  followersUserNames: any = "";
  check: any;

  env: any;

  constructor(
    private _http: HttpClient,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.env = environment["url"]
    this.activatedRoute.params.subscribe(params => {
      var id = params["id"];
      this.check = params["id"]
      var myId = localStorage.getItem("user_id");

      if (myId === id) {
        this.router.navigate(["/profile"]);
      } else {

        this.getFollowing()
        this.getPeopleFollowingYou()

        this.http
          .post(`${environment["url"]}/findById`, { id:id })
          .subscribe(data => {
            console.log("hjuk;hkog;ohuio;uiukk",data)
            this.userData = data;
          });
      }
      this.http
        .post(`${environment["url"]}/follow/getfollowers`, {
          followed_id: id
        })
        .subscribe(data => {
          for (var i = 0; i < data["length"]; i++) {
            if (data[i]["follower_id"].myId === data[i]["followed_id"].id) {
              console.log("YOU ARE FOLLOWING HIM");
              this.followed = true;
              return this.followed;
            } else {
              console.log("YOU ARE NOT FOLLOWING HIM");
              return this.followed;
            }
          }
        })
    });
  }

  follow(id) {
    var follower = localStorage.getItem("user_id");
    this.http
      .post(`${environment["url"]}/follow/create`, {
        follower_id: follower,
        followed_id: id
      })
      .subscribe(data => {
        this.followed = true;
        console.log(data, "user profile res follow");
      });
  }

  unFollow(id) {
    var follower = localStorage.getItem("user_id");
    this.http
      .post(`${environment["url"]}/follow/delete`, {
        follower_id: follower,
        followed_id: id
      })
      .subscribe(data => {
        this.followed = false;
        console.log(data, "user profile res UNFOLLOW");
      });
  }

  getFollowing() {
    this._http
      .get(`${environment["url"]}/follow/getfollowersinfo`)
      .subscribe((data: Array<any>) => {
        data.forEach(element => {
          this.followData.push(element);
        });

        for (var i = 0; i < this.followData.length; i++) {
          if (
            this.followData[i]["follower_id"] == this.check
          ) {
            this.following.push(this.followData[i]);
            this.followingLength = this.following["length"];
          }
        }
      });
  }

  getPeopleFollowingYou() {

    this._http
      .get(`${environment["url"]}/follow/getfollowinglist`)
      .subscribe((data: Array<any>) => {
        data.forEach(element => {
          this.followData_sec.push(element);
        });

        for (var i = 0; i < this.followData_sec.length; i++) {
          if (
            this.followData_sec[i]["followed_id"] == this.check
          ) {
            this.followers.push(this.followData_sec[i]);
            this.followersLength = this.followers["length"];
            console.log("ayy", this.followersLength);

            this.followers.forEach(element => {
              this.followersNames += element.name;
              this.followersUserNames += element.username;
              // this.followersUserNames += element.username + "<br>";
              // this.followersPhoto +=
              //   `http://127.0.0.1:5000/uploads/${element.photo}` + "<br>";
            });
          }
        }
      });
  }
}
