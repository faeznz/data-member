import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members?: any[];

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.http.get<any[]>('http://localhost:3000/members')
      .subscribe(data => {
        this.members = data;
      });
  }

  formatTanggal(tanggal: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const tanggalObj = new Date(tanggal);
    return tanggalObj.toLocaleDateString('id-ID', options);
  }
  
  editMember(id: string) {
    // Navigasi ke halaman edit dengan memberikan ID member sebagai parameter
    // Anda perlu mengatur rute di file app-routing.module.ts
    this.router.navigate(['/edit-member', id]);
  }

  deleteMember(id: string) {
    // Mengambil data member berdasarkan ID sebelum menghapus
    const memberToDelete = this.members?.find(member => member._id === id);
    if (!memberToDelete) {
      console.log('Member not found');
      return;
    }
  
    this.http.delete(`http://localhost:3000/members/${id}`)
      .subscribe(() => {
        console.log('Member deleted successfully');
        // Lakukan tindakan setelah menghapus member, jika diperlukan
        const memberName = memberToDelete.nama; // Mengambil nama member yang dihapus
        alert(`Berhasil menghapus member ${memberName}`);
        window.location.reload();
      }, error => {
        console.log('Failed to delete member', error);
      });
  }
  

}
